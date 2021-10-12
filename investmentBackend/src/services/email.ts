import nodeMailer from 'nodemailer'

export const sendEmailWithNodemailer = (req: any, res: { json: (arg0: { message: string; }) => any; }, emailData: any) => {
	const transporter = nodeMailer.createTransport({
	  host: "smtp.gmail.com",
	  port: 587,
	  secure: false,
	  requireTLS: true,
	  auth: {
		 user: process.env.EMAIL_FROM!, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
		 pass: process.env.GMAIL_APP_PASSWORD!, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
	  },
	  tls: {
		 ciphers: "SSLv3",
	  },
	});
  
	return transporter
	  .sendMail(emailData)
	  .then((info: { response: any; }) => {
		 console.log(`Message sent: ${info.response}`);
		 return res.json({
			message: `Email has been sent to your email. Follow the instruction to activate your account`,
		 });
	  })
	  .catch((err: any) => console.log(`Problem sending email: ${err}`));
 };