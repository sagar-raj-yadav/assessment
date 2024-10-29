import mongoose, { Schema } from 'mongoose';

// Define the schema for the Task model
const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedUser: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: false
    },
    dueDate: {
        type: String, 
        required: false
    },
});



const Task = mongoose.model('Task', taskSchema);
export default Task;
