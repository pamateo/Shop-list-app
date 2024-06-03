const{Schema, model}= require('mongoose');

const TareasSchema= Schema(
    {
        nombre:{
            type: String,
            require:true,
            unique:true
        },
        descripcion:{
            type: String
        },
        prioridad:{
            type: String
        },
        completada:{
            type: Boolean,
            default:false
        }
    }, {collection: 'tareas'}
);

TareasSchema.method('toJSON',function(){
    const {__v,_id, ...object} = this.toObject();
    
    object.uid = _id;
    return object;
})

module.exports= model('Tareas', TareasSchema);