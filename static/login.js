let username = document.getElementById('username');
let password = document.getElementById('password');
let form    = document.getElementById('form');
let output  = document.getElementById('output');

const flash = (message, level) => {
    alerts.innerHTML += `
        <div class="alert alert-${level}" role="alert">
            <button type="button" id="closeAlert" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <strong>${message}</strong>
        </div>
    `;
};

form.addEventListener('submit', e => {
	e.preventDefault();

	fetch('/', {
		method: 'POST',
		body: JSON.stringify({
			username: username.value,
            password: password.value
		}),
		headers: {'Content-Type': 'application/json'}
	}).then(resp => {
		return resp.json();
	}).then(resp => {
        result = resp.message.toString();

		if (result.includes('wrong')) {
            flash(result, 'danger');

            setTimeout(() => {
                document.getElementById('closeAlert').click();
            }, 2000);

            return;
        }
        
        flash(result, 'success');

        setTimeout(() => {
            document.getElementById('closeAlert').click();
            if(result.includes('admin'))
            {
                window.location.href = '/admin';
            }
            else
            {
                window.location.href = '/user';
            }
        }, 2000);
            
        output.value = result;
        
    })
});
