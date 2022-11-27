using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace idz.Migrations
{
    public partial class Testresultoutputadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTestResult_Tests_TestId",
                table: "UserTestResult");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTestResult_Users_UserId",
                table: "UserTestResult");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTestResult",
                table: "UserTestResult");

            migrationBuilder.RenameTable(
                name: "UserTestResult",
                newName: "UserTestResults");

            migrationBuilder.RenameIndex(
                name: "IX_UserTestResult_UserId",
                table: "UserTestResults",
                newName: "IX_UserTestResults_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserTestResult_TestId",
                table: "UserTestResults",
                newName: "IX_UserTestResults_TestId");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Tests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTestResults",
                table: "UserTestResults",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTestResults_Tests_TestId",
                table: "UserTestResults",
                column: "TestId",
                principalTable: "Tests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTestResults_Users_UserId",
                table: "UserTestResults",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTestResults_Tests_TestId",
                table: "UserTestResults");

            migrationBuilder.DropForeignKey(
                name: "FK_UserTestResults_Users_UserId",
                table: "UserTestResults");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTestResults",
                table: "UserTestResults");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Tests");

            migrationBuilder.RenameTable(
                name: "UserTestResults",
                newName: "UserTestResult");

            migrationBuilder.RenameIndex(
                name: "IX_UserTestResults_UserId",
                table: "UserTestResult",
                newName: "IX_UserTestResult_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserTestResults_TestId",
                table: "UserTestResult",
                newName: "IX_UserTestResult_TestId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTestResult",
                table: "UserTestResult",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTestResult_Tests_TestId",
                table: "UserTestResult",
                column: "TestId",
                principalTable: "Tests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserTestResult_Users_UserId",
                table: "UserTestResult",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
