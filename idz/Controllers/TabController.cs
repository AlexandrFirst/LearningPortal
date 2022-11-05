using AutoMapper;
using idz.DL;
using idz.DL.Models;
using idz.Dtos.Link;
using idz.Dtos.Tabs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace idz.Controllers
{

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TabController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public TabController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetTabInfo()
        {
            var currentTabs = await context.Tabs.ToListAsync();
            var tabsToReturn = mapper.Map<List<TabInfoDto>>(currentTabs);
            return Ok(tabsToReturn);
        }

        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateTabs([FromBody] UpdateTabDto updateTabDto)
        {
            var currentTabs = await context.Tabs.ToListAsync();
            var currentLinks = await context.Links.ToListAsync();

            var tabsToAdd = updateTabDto.Tabs.Where(x => !currentTabs.Select(c => c.Id).Contains(x.Id));
            var tabsToRemove = currentTabs.Where(x => !updateTabDto.Tabs.Select(c => c.Id).ToList().Contains(x.Id));

            var tabsToUpdate = currentTabs.Where(x => updateTabDto.Tabs.Select(c => c.Id).ToList().Contains(x.Id));


            foreach (var tab in tabsToAdd)
            {
                var tabToAdd = mapper.Map<Tab>(tab);
                var tabLinks = await context.Links.Where(x => tab.Links.Contains(x.Id)).ToListAsync();
                tabToAdd.Links.AddRange(tabLinks);
                context.Tabs.Add(tabToAdd);
            };

            foreach (var tab in tabsToUpdate)
            {
                var tabDto = updateTabDto.Tabs.First(p => p.Id.Equals(tab.Id));
                var removedLinks = tab.Links.Where(x => !tabDto.Links.Contains(x.Id));
                if (removedLinks.Any())
                {
                    context.Links.RemoveRange(removedLinks);
                }
               
                var addedLinksIds = tabDto.Links.Where(x => !tab.Links.Select(m => m.Id).Contains(x));
                var linksToAdd = currentLinks.Where(x => addedLinksIds.Contains(x.Id));
                foreach (var link in linksToAdd)
                {
                    link.IsUsed = true;
                }
                tab.Links.AddRange(linksToAdd);

            }

            context.Tabs.RemoveRange(tabsToRemove);

            await context.SaveChangesAsync();

            var unusedLinks = await context.Links.Where(x => x.IsUsed == false).ToListAsync();
            context.Links.RemoveRange(unusedLinks);
            await context.SaveChangesAsync();

            return Ok(updateTabDto);
        }
    }
}
