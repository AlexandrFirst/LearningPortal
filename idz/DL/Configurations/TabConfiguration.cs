using idz.DL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace idz.DL.Configurations
{
    public class TabConfiguration : IEntityTypeConfiguration<Tab>
    {
        public void Configure(EntityTypeBuilder<Tab> builder)
        {
            builder.HasMany(x => x.Links).WithOne(x => x.Tab).OnDelete(DeleteBehavior.Cascade);
            builder.HasIndex(x => x.Name).IsUnique();
            builder.HasMany(x => x.Tests).WithOne(x => x.Tab).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
