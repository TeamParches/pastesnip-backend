const { Schema, model, connection } = require('mongoose')

const pasteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 30,
        },
        content: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1000,
        },
        syntax_highlight: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        views: {
            type: Number,
            required: true,
            default: 0,
        },
        private: {
            type: Boolean,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

pasteSchema.virtual('storage_size').get(function () {
    return connection.db.command({
        storageSize: this.collection.name,
        size: true,
    })
})

module.exports = model('Paste', pasteSchema)
