
function sendemail(){
    
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")
const msg = {
  to: 'econcours@outlook.com', // Change to your recipient
  from: 'thebrogrammer07@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
    
}