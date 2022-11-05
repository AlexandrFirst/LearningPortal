using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using idz.ReadModels;

namespace idz.Services.CloudinaryUploaders
{
    public class FileUploader : MediaContentUploader
    {
        public FileUploader(Cloudinary cloudinary) : base(cloudinary)
        {
        }

        protected override async Task<RawUploadResult> MyUpload(Cloudinary cloudinary, FileUploadRequest param)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(param.Name, param.DataStream)
            };
            ImageUploadResult result = await cloudinary.UploadAsync(uploadParams);

            return result;
        }
    }
}
