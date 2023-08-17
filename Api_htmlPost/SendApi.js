// action="/school/forget" method="post" enctype="application/x-www-form-urlencoded" 
// onsubmit="send(event, this,'msgforget','/login',true, 'Password Has been reset')"


function send(e,form,ouput,success, Alerter, Alerttext) {
    ApiIntegration(form,ouput,success,Alerter,Alerttext)
    e.preventDefault();
  }

  async function ApiIntegration(form, output, success,Alerter, Alerttext) {
    let msgg= document.getElementById(output)
    try {
        Loader.open()
        console.log(form.enctpye);
        let SendData=await axios({url:form.action, method:'post', headers:{
            Accept:'application/json',
            'Content-Type':`${form.enctype}`
        }, data:new FormData(form)});
        
        let data= SendData.data

        Alerter?alert(Alerttext):null

        
        window.location.pathname=success


    Loader.close()
    } catch (error) {
        console.log(error);
        msgg.innerHTML=error?.response?.data?error.response.data.Error:"Connection error"
    } finally{
        Loader.close()

    }
    
  }