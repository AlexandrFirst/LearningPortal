namespace idz.ReadModels
{
    public class FileUploadRequest
    {
        public Stream DataStream { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
    }
}
