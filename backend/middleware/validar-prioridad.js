const {response}=require('express');
const prioridades=['BAJA', 'MEDIA', 'ALTA'];

const validarPrioridad=(req, res=response, next)=>{
    const prioridad=req.body.prioridad||req.query.prioridad;
    if(prioridad && !prioridades.includes(prioridad)){
        return res.status(400).json({
            ok:false,
            msg:'Prioridad no permitida'
        });
    }
    next();
}

module.exports={validarPrioridad}