const {Router}=require('express');
const{check} =require('express-validator');

const {getTareas, crearTarea, updateTarea, deleteTarea}=require('../controllers/tareas.controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarPrioridad } = require('../middleware/validar-prioridad');

const router=Router();

router.get('/',[
    check('id','El id de rutina debe ser valido').optional().isMongoId(),
    check('completadas','El atributo completadas debe ser booleano').optional().isBoolean(),
], getTareas);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim(),
    check('descripcion', 'la descripción debe ser válida').optional().isString().trim(),
    validarCampos,
    validarPrioridad
], crearTarea);

router.delete('/:id',[
    check('id', 'El id de la tarea debe ser válido').isMongoId()
], deleteTarea);

router.put('/:id',[
    check('nombre', 'El nombre es obligatorio').optional().isEmpty().trim(),
    check('descripcion', 'la descripción debe ser válida').optional().isString().trim(),
    check('completada', 'El atributo completada es obligatorio y  debe ser booleano').optional().isBoolean(),
    validarCampos,
    validarPrioridad
], updateTarea);

module.exports=router;