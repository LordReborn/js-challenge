const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const registry = require('../registry.json');

//Peticion del registro
router.get('/', (req, res) => {
    res.json(registry);
});

//Publicar un registro
router.post('/', (req, res) => {
    const id = registry.length + 1;
    const { user, concept, mont, date, category } = req.body;
    const newRegistry = { ...req.body, id };
    if (id && user && concept && mont && date && category) {
        registry.push(newRegistry);
        res.json(registry);
    } else {
        res.status(500).json({error: 'Hubo un error al publicar el nuevo registro'});
    }
});

//Actualizacion del registro
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user, concept, mont, date, category } = req.body;
    if (id && user && concept && mont && date && category) {
        _.each(registry, (record, i) => {
            console.log(record.id == id)
            if (record.id == id) {
                record.user = user;
                record.concept = concept;
                record.mont = mont;
                record.date = date;
                record.category = category;
            }
        });
        res.status(202).json(registry);
    } else {
        res.status(500).json({error: 'Hubo un error al actualizar el registro'});
    }
});

//Borrar un registro
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(registry, (record, i) => {
            if (record.id == id) {
                registry.splice(i, 1);
            }
        });
        res.json(registry);
    }
});

module.exports = router;