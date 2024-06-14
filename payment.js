document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');

    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const paymentData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            cardNumber: document.getElementById('cardNumber').value,
            cardExpiration: document.getElementById('cardExpiration').value,
            cardOwner: document.getElementById('cardOwner').value,
            cvv: document.getElementById('cvv').value
        };

        try {
            const response = await fetch('https://projetofinal-production-55a0.up.railway.app/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paymentData)
            });

            const responseData = await response.json();
            if (response.ok) {
                alert('Pagamento Bem Efetuado');

                const userEmail = paymentData.email;
                if (userEmail) {
                    await fetch(`https://microsservi-oandrade-production.up.railway.app/api/upgrade/${userEmail}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }

                window.location.href = 'home.html';
            } else {
                alert('Erro no pagamento, tente novamente');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro no pagamento, tente novamente');
        }
    });
});
