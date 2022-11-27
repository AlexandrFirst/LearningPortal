using idz.DL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace idz.DL.Configurations
{
    public class TestConfiguration : IEntityTypeConfiguration<Test>
    {
        public void Configure(EntityTypeBuilder<Test> builder)
        {
            builder.HasMany(x => x.Questions).WithOne(x => x.Test).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
