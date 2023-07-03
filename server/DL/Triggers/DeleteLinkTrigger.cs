using EntityFrameworkCore.Triggered;
using idz.DL.Models;
using idz.Services;
using idz.Utils;

namespace idz.DL.Triggers
{
    public class DeleteLinkTrigger : IBeforeSaveTrigger<Link>
    {
        private readonly ICloudinaryService cloudinaryService;
        private readonly BackgroundQueue backgroundQueue;

        public DeleteLinkTrigger(ICloudinaryService cloudinaryService, BackgroundQueue backgroundQueue)
        {
            this.cloudinaryService = cloudinaryService;
            this.backgroundQueue = backgroundQueue;
        }

        public async Task BeforeSave(ITriggerContext<Link> context, CancellationToken cancellationToken)
        {
            if (context.ChangeType == ChangeType.Deleted) 
            {
                var link = context.Entity;
                if (!string.IsNullOrEmpty(link.ResourceId)) 
                {
                    await backgroundQueue.QueueTask(async () =>
                    {
                        await cloudinaryService.DeleteFile(link.ResourceId);
                    });
                }
            }
        }
    }
}
