using CloudinaryDotNet.Actions;
using idz.DL.Models;
using idz.ReadModels;

namespace idz.Services
{
    public interface ICloudinaryService
    {
        Task<DeletionResult> DeleteFile(string filePublicId);
        Task<FileUploadResponse> UploadFile(IFormFile file, LinkType linkType);
    }
}
