using Microsoft.EntityFrameworkCore;
using Rekrut.Models.Database.Business;
using Rekrut.Models.Database.System;

namespace Rekrut.Models.Database;

public partial class RekrutContext : DbContext
{
    public RekrutContext() {}

    public RekrutContext(DbContextOptions<RekrutContext> options) : base(options) {}

    public virtual DbSet<Applicant> Applicants { get; set; }

    public virtual DbSet<Feature> Features { get; set; }

    public virtual DbSet<Job> Jobs { get; set; }

    public virtual DbSet<JobApplication> JobApplications { get; set; }

    public virtual DbSet<Profile> Profiles { get; set; }

    public virtual DbSet<ProfileFeatureMap> ProfileFeatureMaps { get; set; }

    public virtual DbSet<Recruiter> Recruiters { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Applicant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Applicant_pkey");

            entity.ToTable("Applicant", "business");

            entity.HasIndex(e => e.UserId, "Applicant_user_id_key").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.FullName)
                .HasColumnType("character varying")
                .HasColumnName("full_name");
            entity.Property(e => e.PhoneNumber)
                .HasColumnType("character varying")
                .HasColumnName("phone_number");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithOne(p => p.Applicant)
                .HasForeignKey<Applicant>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Applicant_user_id_fkey");
        });

        modelBuilder.Entity<Feature>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Feature_pkey");

            entity.ToTable("Feature", "system");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Code)
                .HasColumnType("character varying")
                .HasColumnName("code");
            entity.Property(e => e.Description)
                .HasColumnType("character varying")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
            entity.Property(e => e.Route)
                .HasColumnType("character varying")
                .HasColumnName("route");
        });

        modelBuilder.Entity<Job>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Job_pkey");

            entity.ToTable("Job", "business");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasColumnType("character varying")
                .HasColumnName("description");
            entity.Property(e => e.Title)
                .HasColumnType("character varying")
                .HasColumnName("title");
        });

        modelBuilder.Entity<JobApplication>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("JobApplication_pkey");

            entity.ToTable("JobApplication", "business");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.ApplicantId).HasColumnName("applicant_id");
            entity.Property(e => e.CoverLetter)
                .HasColumnType("character varying")
                .HasColumnName("cover_letter");
            entity.Property(e => e.JobId).HasColumnName("job_id");
            entity.Property(e => e.Resume)
                .HasColumnType("character varying")
                .HasColumnName("resume");

            entity.HasOne(d => d.Applicant).WithMany(p => p.JobApplications)
                .HasForeignKey(d => d.ApplicantId)
                .HasConstraintName("JobApplication_applicant_id_fkey");

            entity.HasOne(d => d.Job).WithMany(p => p.JobApplications)
                .HasForeignKey(d => d.JobId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("JobApplication_job_id_fkey");
        });

        modelBuilder.Entity<Profile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Profiles_pkey");

            entity.ToTable("Profile", "system");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Code)
                .HasColumnType("character varying")
                .HasColumnName("code");
            entity.Property(e => e.Description)
                .HasColumnType("character varying")
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
        });

        modelBuilder.Entity<ProfileFeatureMap>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("ProfileFeatureMap_pkey");

            entity.ToTable("ProfileFeatureMap", "system");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.FeatureId).HasColumnName("feature_id");
            entity.Property(e => e.ProfileId).HasColumnName("profile_id");

            entity.HasOne(d => d.Feature).WithMany(p => p.ProfileFeatureMaps)
                .HasForeignKey(d => d.FeatureId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ProfileFeatureMap_feature_id_fkey");

            entity.HasOne(d => d.Profile).WithMany(p => p.ProfileFeatureMaps)
                .HasForeignKey(d => d.ProfileId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ProfileFeatureMap_profile_id_fkey");
        });

        modelBuilder.Entity<Recruiter>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Recruiter_pkey");

            entity.ToTable("Recruiter", "business");

            entity.HasIndex(e => e.UserId, "Recruiter_user_id_key").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.FullName)
                .HasColumnType("character varying")
                .HasColumnName("full_name");
            entity.Property(e => e.PhoneNumber)
                .HasColumnType("character varying")
                .HasColumnName("phone_number");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithOne(p => p.Recruiter)
                .HasForeignKey<Recruiter>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Recruiter_user_id_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("User_pkey");

            entity.ToTable("User", "system");

            entity.HasIndex(e => e.Email, "User_email_key").IsUnique();

            entity.HasIndex(e => e.UserName, "User_user_name_key").IsUnique();

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(254)
                .HasColumnName("email");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(512)
                .HasColumnName("password_hash");
            entity.Property(e => e.ProfileId).HasColumnName("profile_id");
            entity.Property(e => e.UserName)
                .HasMaxLength(30)
                .HasColumnName("user_name");

            entity.HasOne(d => d.Profile).WithMany(p => p.Users)
                .HasForeignKey(d => d.ProfileId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("User_profile_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
