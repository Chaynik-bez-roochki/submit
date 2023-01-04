

function formSub (){
    const form = document.querySelectorAll('form');
    let mess = {
        load: 'Идет загрузка',
        done: 'Спасибо! Данные успешно отправлены',
    eror: 'Что-то пошло не так :('
   };

   form.forEach(item => {
    item.addEventListener('submit', (e)=>{
        e.preventDefault();

        let statusMess = document.createElement('div');
        statusMess.classList.add('status');
        item.appendChild(statusMess);

        const formData = new FormData(item);

        postData('serner.php',formData)
        .then(res => {
            console.log(res);
            statusMess.textContent = mess.done;
        })
        .catch(()=> 
        statusMess.textContent = mess.eror
        )
        .finally(()=> {
            setTimeout(()=>{
                statusMess.remove();
            },8000);
        }
        )


    });
   });

   async function postData (url, data){
    document.querySelector('.status').textContent = mess.load;
    let res = await fetch(url, {
        method: "POST",
        body: data
    });
    return await res.text();

   };
};

formSub ();