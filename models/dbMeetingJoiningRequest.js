import mongoose from "mongoose";

const MeetingJoiningRequestSchema = mongoose.Schema({
    meetingTitle: String,
    meetingMemberId: String,
    meetingAttendanceDetailId: String,
    senderName: String,

});

export default mongoose.model('MeetingJoiningRequest', MeetingJoiningRequestSchema);
