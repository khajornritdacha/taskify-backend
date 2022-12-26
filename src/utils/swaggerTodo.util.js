/**
 * @swagger
 *  tags:
 *    name: Todo
 *    description: Manipulating todos
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get a list of todos of the user
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 toRemoves:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Add new todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todoText:
 *                 type: string
 *                 default: Finish first page of Survey
 *               isDone:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Add succesfully
 */

/**
 * @swagger
 * /api/todos:
 *   put:
 *     summary: Edit list of todos
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todos:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Todo'
 *               toRemoves:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Update Succesfully
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Edit a single todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: the id of a todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todoText:
 *                 type: string
 *                 default: New text
 *     responses:
 *       200:
 *         description: Update Succesfully
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a single todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: the id of a todo
 *     responses:
 *       200:
 *         description: Delete Succesfully
 */
