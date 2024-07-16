const{Schema, model}= require('mongoose');

const HistorialSchema= Schema(
    {
        nombre:{
            require:true,
            type: String
        },
        fecha:{
            type: String
        },
        precio:{
            require:true,
            type:Number
        },
        productos:[{
            type:Schema.Types.ObjectId,
            ref:'Tareas'
        }]

        
    }, {collection: 'historial'}
);

HistorialSchema.method('toJSON',function(){
    const {__v,_id, ...object} = this.toObject();
    
    object.uid = _id;
    return object;
})

module.exports= model('Historial', HistorialSchema);