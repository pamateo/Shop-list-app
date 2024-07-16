const {response}=require('express');
const Historial = require('../models/historial.model');



const getHistorial=async(req, res=response)=>{

    const uid=req.query.id;

    let historial;

    try {
        if(uid){
            console.log('llego');
            historial= await Historial.findById(uid);
            if(!historial){
                return res.status(400).json({
                    ok:false,
                    msg:'No existe esa tarea con esa id'
                });
            }  
        }
        else{
            historial=await Historial.find();
        }
        res.json({
            ok:true,
            msg:'Get historial',
            historial
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'error obteniendo historiales',
            error
        })
    }
}

const deleteHistorial=async (req, res=response)=>{
    const uid=req.params.id;
    try {
        const existeHistorial=await Historial.findById(uid);
        if(!existeHistorial){
            return res.status(400).json({
                ok:false,
                msg:'No existe un historial con ese identificador'
            });
        }

        const resultado=await Historial.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Historial borrada correctamente',
            resultado
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error borrando el historial'
        });
    }
}

const crearHistorial=async(req, res=response)=>{
    const{nombre, precio, productos}=req.body;
    
    
    try { 
        const historial=new Historial({
            nombre:nombre,
            precio:precio,
            productos:productos
        });
        historial.fecha=new Date();
        await historial.save();
        
        res.json({
            ok:true,
            msg:'Historial creado correctamente',
            historial
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error creando el historial'
        })
    }
    
}



module.exports={getHistorial, crearHistorial, deleteHistorial}