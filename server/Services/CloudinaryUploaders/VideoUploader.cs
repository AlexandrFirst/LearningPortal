using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using idz.ReadModels;

namespace idz.Services.CloudinaryUploaders
{
    public class VideoUploader : MediaContentUploader
    {
        public VideoUploader(Cloudinary cloudinary) : base(cloudinary)
        {

        }

        protected override async Task<RawUploadResult> MyUpload(Cloudinary cloudinary, FileUploadRequest param)
        {
            var uploadParams = new VideoUploadParams()
            {
                File = new FileDescription(param.Name, param.DataStream)
            };

            VideoUploadResult result = null;

            if (param.Size >= 100 * 1024)
            {
                result = await cloudinary.UploadLargeAsync(uploadParams);
            }
            else
            {
                result = await cloudinary.UploadAsync(uploadParams);
            }

            return result;
        }
    }
}
