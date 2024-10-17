// Start
const 
puppeteer = require('puppeteer'),
fs = require('fs');


(async () => {

    function Mkdir(dirName){
        if (!fs.existsSync(dirName)){
            fs.mkdirSync(dirName);
        }
    }

    Mkdir('cache')
    Mkdir('gpr_covid')


         const browser = await puppeteer.launch({
            headless: 1, // run on headless mode
            args: [
                '--no-sandbox', '--disable-setuid-sandbox',
                '--disk-cache-dir='+ __dirname +'/cache'
            ],
        });
    const page = await browser.newPage();
    await page.goto('https://rahadiana.github.io/gpr_widget_kominfo/example/original.html');
    await page.setViewport({
        width: 1200,
        height: 800
    });

    page.on('response', async (response) => {
        // Ignore GET requests
        if (response.request().method() !== 'GET') return
        
        if (response.url().includes('/gpr-widget-kominfo.min.js')) {
            if (response.url() == response.url()) {
                
                const Response = await response.text()
                fs.writeFileSync("gpr-widget-kominfo.min.js", Response);
                await page.waitForTimeout(9000);
                await page.reload();
            }
        }

        if (response.url().includes('/gpr-widget-kominfo.min.css')) {
            if (response.url() == response.url()) {
                
                const Response = await response.text()
                fs.writeFileSync("gpr-widget-kominfo.min.css", Response);
                await page.waitForTimeout(9000);
                await page.reload();
            }
        }

        if (response.url().includes('/gpr.xml')) {
            if (response.url() == response.url()) {
                
                const Response = await response.text()
                fs.writeFileSync("gpr_covid/covid_gpr.xml", Response);
                await page.waitForTimeout(9000);
                console.log("bye")
                process.exit()
            }
        }

        
    })

    await page.waitForTimeout(9000);
    await page.reload();

    await page.waitForTimeout(9000);
    await page.reload();

    await page.waitForTimeout(9000);
    await page.reload();
    
    await page.waitForTimeout(9000);
    await page.reload();

    await page.waitForTimeout(9000);
    await page.reload();    
    

})();
