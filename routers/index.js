const loginRouter= require('./login.router');
const homeRouter= require('./home.router')
const courseRouter= require('./course.router')
const courseItemRouter= require('./courseitem.router')
module.exports= (app)=>{
  app.use("/", loginRouter);
  app.use("/home", homeRouter);
  app.use("/course", courseRouter);
  app.use("/courseitem", courseItemRouter);
}