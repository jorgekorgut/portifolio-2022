module.exports = {

  async send(ctx) {
    
    const msg = {
      to: 'jorge.korgut-junior@insa-lyon.fr', // Change to your recipient
      from: 'no-reply@korgut.fr',
      email: ctx.request.body.email,
      name:ctx.request.body.name,
      subject: ctx.request.body.subject,
      text: ctx.request.body.message,
    }
    
    try{
      await strapi.plugins['email'].services.email.send({
        to:msg.to,
        from:msg.from,
        subject:'[PORTIFOLIO]['+msg.name+']'+msg.subject,
        text:"[Message from: "+msg.name+"]\n[Email for contact: "+msg.email+"]\n"+msg.text,
      });
      console.log("Email Sent!");
    } catch(error){
      console.log(error); 
    }
  },
};