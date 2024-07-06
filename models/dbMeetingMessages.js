import mongoose from "mongoose";

const MeetingMessageSchema = mongoose.Schema({
    message: String,
    name: String,
    timeStamp: String
});

export default mongoose.model('MeetingMessageContent', MeetingMessageSchema);
