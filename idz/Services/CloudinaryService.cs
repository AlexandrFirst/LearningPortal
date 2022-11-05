using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using idz.DL.Models;
using idz.ReadModels;
using idz.Services.CloudinaryUploaders;
using Microsoft.Extensions.Options;

namespace idz.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        private Cloudinary cloudinary;
        public CloudinaryService(IOptions<CloudinaryOptions> cloudinaryOptions)
        {
            var cloudinaryAccount = new Account(cloudinaryOptions.Value.CloudName,
                                               cloudinaryOptions.Value.APIKey,
                                               cloudinaryOptions.Value.APISecret);

            cloudinary = new Cloudinary(cloudinaryAccount);
            cloudinary.Api.Secure = true;
        }
        public async Task<DeletionResult> DeleteFile(string filePublicId)
        {
            return await cloudinary.DestroyAsync(new DeletionParams(filePublicId));
        }

        public async Task<FileUploadResponse> UploadFile(IFormFile file, LinkType linkType)
        {
            switch (linkType)
            {
                case LinkType.Pdf:
                    return await uploadMedia(new FileUploader(cloudinary), file);
                case LinkType.Video:
                    return await uploadMedia(new VideoUploader(cloudinary), file);
                default:
                    throw new Exception("Wrong link type");
            };
        }

        private async Task<FileUploadResponse> uploadMedia(MediaContentUploader mediaContent, IFormFile file)
        {
            return await mediaContent.UploadContent(file);
        }
    }
}
