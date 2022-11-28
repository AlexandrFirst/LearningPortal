using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace idz.Migrations
{
    public partial class TestCascadeDeletion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tests_Tabs_TabId",
                table: "Tests");

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_Tabs_TabId",
                table: "Tests",
                column: "TabId",
                principalTable: "Tabs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tests_Tabs_TabId",
                table: "Tests");

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_Tabs_TabId",
                table: "Tests",
                column: "TabId",
                principalTable: "Tabs",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
