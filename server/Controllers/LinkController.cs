using AutoMapper;
using idz.DL;
using idz.DL.Models;
using idz.Dtos.Link;
using idz.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace idz.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LinkController : ControllerBase
    {
        private readonly DataContext context;
        private readonly ICloudinaryService cloudinaryService;
        private readonly IMapper mapper;

        public LinkController(DataContext context,
            ICloudinaryService cloudinaryService, IMapper mapper)
        {
            this.context = context;
            this.cloudinaryService = cloudinaryService;
            this.mapper = mapper;
        }

        [HttpPost("AddLink")]
        public async Task<IActionResult> AddLink([FromForm] InputLinkData media)
        {
            LinkDto linkDto = new LinkDto();
            linkDto.Description = media.Description;
            linkDto.ContentType = media.LinkType;
            
            if (!string.IsNullOrEmpty(media.Src))
            {
                linkDto.Content = media.Src;
            }
            else
            {
                var uploadResult = await cloudinaryService.UploadFile(media.FileToUpload, media.LinkType);
                linkDto.Content = uploadResult.Url;
                
                linkDto.ResourceId = uploadResult.PublicId;
                linkDto.Metadata = JsonConvert.SerializeObject(new
                {
                    VideoDuration = uploadResult.Duration,
                    Name = uploadResult.Name
                });
            }

            var dbLink = mapper.Map<Link>(linkDto);
            context.Links.Add(dbLink);

            await context.SaveChangesAsync();

            linkDto = mapper.Map<LinkDto>(dbLink);

            return Ok(linkDto);
        }

        [HttpPut("UpdateLink/{id}")]
        public async Task<IActionResult> UpdateLink([FromForm] InputLinkData media, int id)
        {
            var linkToUpdate = await context.Links.FirstOrDefaultAsync(x => x.Id == id);
            if (linkToUpdate == null)
            {
                return NotFound(new { Message = "Updating link is not found" });
            }

            linkToUpdate.Description = media.Description;
            linkToUpdate.ContentType = media.LinkType;

            linkToUpdate.Content = media.Src;

            if (media.FileToUpload != null)
            {
                switch (media.LinkType)
                {
                    case LinkType.Link:
                        throw new Exception("Simple link can't have a source");
                    case LinkType.Pdf:
                    case LinkType.Video:
                        if (media.FileToUpload != null)
                        {
                            var uploadResult = await cloudinaryService.UploadFile(media.FileToUpload, media.LinkType);
                            if (!string.IsNullOrEmpty(linkToUpdate.ResourceId))
                            {
                                var deletionResult = await cloudinaryService.DeleteFile(linkToUpdate.ResourceId);
                            }
                            linkToUpdate.Content = uploadResult.Url;

                            linkToUpdate.ResourceId = uploadResult.PublicId;
                            linkToUpdate.Metadata = JsonConvert.SerializeObject(new
                            {
                                VideoDuration = uploadResult.Duration,
                                Name = uploadResult.Name
                            });
                        }
                        break;
                    default:
                        throw new Exception("unknown link type");
                }
            }

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("DeleteLink/{id}")]
        public async Task<IActionResult> DeleteLink(int id) 
        {
            var linkToDelete = await context.Links.FirstOrDefaultAsync(x => x.Id == id);
            if (linkToDelete == null) 
            {
                return NotFound(new { Message = "Link to delete is not found" });
            }

            context.Links.Remove(linkToDelete);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
