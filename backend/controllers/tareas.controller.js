const {response}=require('express');
const Tareas = require('../models/tareas.model');


const getTareas=async(req, res=response)=>{

    const uid=req.query.id;
    const completadas=req.query.completadas;

    let tareas;

    try {
        if(uid){
            console.log('llego');
            tareas= await Tareas.findById(uid);
            if(!tareas){
                return res.status(400).json({
                    ok:false,
                    msg:'No existe esa tarea con esa id'
                });
            }  
        }else if(completadas){
            tareas=await Tareas.find({completada:completadas});
        }
        else{
            tareas=await Tareas.find();
        }
        res.json({
            ok:true,
            msg:'Get tareas',
            tareas
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'error obteniendo tareas',
            error
        })
    }
}

const crearTarea=async(req, res=response)=>{
    const{nombre, ...object}=req.body;
    
    try {
        const existeNombre=await Tareas.findOne({nombre});
        if(existeNombre){
            return res.status(400).json({
                ok:false,
                msg:'No se puede crear la tarea porque ya existe una con ese nombre'
            });
        }
        

        const tarea=new Tareas(object);
        tarea.nombre=nombre;
        tarea.completada=false;
        await tarea.save();

        res.json({
            ok:true,
            msg:'Tarea creada correctamente',
            tarea
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error creando la tarea'
        })
    }
    
}

const updateTarea=async (req, res=response)=>{
    const {nombre, ...object}=req.body;
    const id=req.params.id;
    try {
        const existeTarea=await Tareas.findById(id);
        if(!existeTarea){
            return res.status(400).json({
                ok:false,
                msg:'La tarea no existe'
            });
        }
        const existeNombre=await Tareas.findOne({nombre});
        if(existeNombre){
            return res.status(400).json({
                ok:false,
                msg:'No puede haber tareas con el mismo nombre'
            });
        }
        // if(object.nombre!=''){
        //     object.nombre=nombre;
        // }
        const tarea=await Tareas.findByIdAndUpdate(id,object,{new:true});

        res.json({
            ok:true,
            msg:'Tarea actualizada',
            tarea
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error actualizando tarea'
        })
    }
}

const deleteTarea=async (req, res=response)=>{
    const uid=req.params.id;
    try {
        const existeTarea=await Tareas.findById(uid);
        if(!existeTarea){
            return res.status(400).json({
                ok:false,
                msg:'No existe tarea con ese identificador'
            });
        }

        const resultado=await Tareas.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Tarea borrada correctamente',
            resultado
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Error borrando la tarea'
        });
    }
}

module.exports={getTareas, crearTarea, updateTarea, deleteTarea}