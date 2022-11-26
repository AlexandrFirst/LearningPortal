using idz.DL.Configurations;
using idz.DL.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace idz.DL
{
    public class DataContext: DbContext
    {
        public virtual DbSet<Link> Links { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Tab> Tabs { get; set; }
        public virtual DbSet<Test> Tests { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<UserTestResult> UserTestResults { get; set; }

        public DataContext([NotNull] DbContextOptions options): base(options)
        {
            Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.ApplyConfiguration(new TabConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new TestConfiguration());
        }
    }
}
