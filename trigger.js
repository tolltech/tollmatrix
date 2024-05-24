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

        function GetValue(key) {
            var divLevel = $("div:contains('" + key + "')");
            //$('[data-tid=PeriodSwitcher] :contains(".")')

            for (var i = 0; i < divLevel.length; ++i) {
                if (divLevel[i].innerText && divLevel[i].innerText == key){
                    return divLevel[i].parentNode.lastChild.innerText;
                }
            }
        }

        function GetPeriod(){
            var spans = $('[data-tid=PeriodSwitcher] :contains(".")');
            for (var i = 0; i < spans.length; ++i) {
               var text = spans[i].innerText;
               if (text) return text;
            }
        }

        function GetRow() {
            var row = {
                Name: "ERROR",
                FromDate: "ERROR",
                ToDate: "ERROR",
                ForkStart: "ERROR",
                ForkEnd: "ERROR",
                Level: "ERROR",
                Letter: "ERROR",
                Salary: "ERROR",
                GoalSalary: "ERROR",
                ExpectSalary: "ERROR",
                OprionsProgram: "ERROR"
            };

            row.Level = GetValue('Уровень');
            row.Letter = GetValue('Оценка');
            row.Salary = GetValue('Постоянная часть з/п');
            row.GoalSalary = GetValue('Целевой уровень');
            row.ExpectSalary = GetValue('Ожидания');
            row.OprionsProgram = GetValue('Включить в опционную программу');

            row.Name = $('div [data-tid=UserName]').text();
            var period = GetPeriod().split('-');
            if (period.length > 0) row.FromDate = period[0].trim();
            if (period.length > 1) row.ToDate = period[1].trim();

            var allForks = $('div[data-tid=SalaryForks]');            

            var forkLowers = $(allForks[0]).find('span[data-tid=forkLower]');
            if (forkLowers.length > 0) row.ForkStart = forkLowers[0].innerText;

            var forkUppers = $(allForks[0]).find('span[data-tid=forkUpper]') 
            if (forkUppers.length > 0) row.ForkEnd = forkUppers[0].innerText;            

            return row;
        }

        const button = document.createElement("button");
        button.id = 'tollmatrix_download_btn';
        button.textContent = 'Download N rows';
        button.style = "top:0;right:0;position:fixed;z-index:9999;background:none;border:none;color:rgb(102, 204, 255)";

        button.addEventListener('click', () => {
            DownloadJsonFile(totalRows.values().toArray(), 'Test.json');
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