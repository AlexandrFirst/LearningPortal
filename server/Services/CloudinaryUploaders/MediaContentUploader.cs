using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using idz.ReadModels;

namespace idz.Services.CloudinaryUploaders
{
    public abstract class MediaContentUploader
    {
        protected readonly Cloudinary cloudinary;
        public MediaContentUploader(Cloudinary cloudinary)
        {
            this.cloudinary = cloudinary;
        }

        public async Task<FileUploadResponse> UploadContent(IFormFile file)
        {
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {

                    var result = await MyUpload(cloudinary, new FileUploadRequest()
                    {
                        DataStream = stream,
                        Name = file.FileName,
                        Size = file.Length
                    });

                    Type resultType = result.GetType();

                    if (resultType == (typeof(VideoUploadResult)))
                    {
                        return new FileUploadResponse()
                        {
                            Name = file.FileName,
                            PublicId = result.PublicId,
                            Url = result.Url.ToString(),
                            Duration = (result as VideoUploadResult).Duration.ToString()
                        };
                    }

                    return new FileUploadResponse()
                    {
                        Name = file.FileName,
                        PublicId = result.PublicId,
                        Url = result.Url.ToString()
                    };
                }
            }
            else
            {
                throw new Exception("Zero length");
            }
        }

        protected abstract Task<RawUploadResult> MyUpload(Cloudinary cloudinary, FileUploadRequest param);

    }
}
