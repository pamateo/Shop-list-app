const {Router}=require('express');
const{check} =require('express-validator');

const {getHistorial, crearHistorial, deleteHistorial}=require('../controllers/historial.controller');
const { validarCampos } = require('../middleware/validar-campos');

const router=Router();

router.get('/',[
    check('id','El id del historial debe ser valido').optional().isMongoId()
    // check('completadas','El atributo completadas debe ser booleano').optional().isBoolean(),
], getHistorial);

router.delete('/:id',[
    check('id', 'El id del historial debe ser válido').isMongoId()
], deleteHistorial);

router.post('/',[

    check('nombre', 'El nombre es obligatorio').isString().trim(),
    check('precio', 'El precio es obligatorio').isNumeric(),
    validarCampos,
], crearHistorial);



module.exports=router;