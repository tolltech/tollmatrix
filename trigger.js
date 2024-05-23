var wasTollMatrixInjected;
var totalRows = new Map();

setTimeout(function () {

    if (!wasTollMatrixInjected) {
        wasTollMatrixInjected = true;

        function DownloadJsonFile(obj, name) {
            var csv = 'data:application/octet-stream,'
                + encodeURIComponent(JSON.stringify(obj));

            var link = document.createElement('a');
            link.setAttribute('href', csv);
            link.setAttribute('download', name);
            link.style.display = 'none';
            document.body.appendChild(link); // Required for FF

            link.click();
        }

        function GetRow() {
            var row = {
                Name: "Name",
                FromDate: "FromDate",
                ToDate: "ToDate",
                ForkStart: "ForkStart",
                ForkEnd: "ForkEnd",
                Level: "Level",
                Letter: "Letter",
                Salary: "Salary",
                GoalSalary: "GoalSalary",
                ExpectSalary: "ExpectSalary",
                OprionsProgram: "OptionsProgram"
            };
            return row;
        }

        const button = document.createElement("button");
        button.id = 'tollmatrix_download_btn';
        button.textContent = 'Download N rows';
        button.style = "top:0;right:0;position:fixed;z-index:9999;background:none;border:none;color:rgb(102, 204, 255)";

        button.addEventListener('click', () => {
            DownloadJsonFile('TEST', 'Test.json');
        });

        document.body.appendChild(button);

        $(document).on('keydown', function (e) {
            if (!e.ctrlKey || !e.altKey || !e.shiftKey)
                return;

            if (e.which != 13)
                return;

            row = GetRow();
            totalRows.set(row.Name + row.FromDate, row);

            $('#tollmatrix_download_btn').html('Download ' + totalRows.size + ' rows');
        });
    }
}, 5000);