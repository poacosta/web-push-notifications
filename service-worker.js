self.addEventListener('notificationclose', event => {
    console.log('notification closed', event)
})

self.addEventListener('notificationclick', event => {
    if (event.action === "search") {
        const githubUser = event.notification.data.githubUser;
        clients.openWindow(`https://github.com/${githubUser}`);
    } else if (event.action === "close") {
        clients.openWindow(`https://rebrand.ly/funny-dog`);
    }

    console.log('notification clicked', event)
})

self.addEventListener('push', event => {
    const transaction = JSON.parse(event.data.text());
    const options = {
        body: transaction.business
    }

    const transactionType = transaction.type === "deposit" ? '+' : '-';

    event.waitUntil(
        self.registration.showNotification(`${transactionType} ` + transaction.amount, options)
    )
})
