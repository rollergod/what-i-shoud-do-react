using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Persistance.Migrations
{
    public partial class AddDateOnlyColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "CreatedDate",
                table: "Posts",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c55eece7-1eeb-40ca-953f-dfab7bc8598a", "AQAAAAEAACcQAAAAEF8b0IxTQKjpmSBXn9uX27lOv4Z6Sl9k3iIancdbtiop4yD9wSRtOuT+PL92FjBuOw==", "6b34e755-523d-493e-8543-5f7ba5a6b1c0" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Posts");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8e445865-a24d-4543-a6c6-9443d048cdb9",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ff90928f-0cf1-4841-928f-1594d7e5b077", "AQAAAAEAACcQAAAAEDiXxvitFqOch2lBW9TGOkx3bzbCP94PKgBSpUe++4dYTpE211pDcTIUJluaUozR/Q==", "b8717eb8-e84e-456d-b9fb-875ee13c2782" });
        }
    }
}
