import Reply from '../models/replySchema.js'
import Post from '../models/postSchema.js'
import clerkClient from '@clerk/clerk-sdk-node'

export const postReply = async (req, res) => {
    try {
        const { userId, postId } = req.params;
        const { content } = req.body;

        const newReply = await Reply.create({
            content,
            userRef: userId,
            postRef: postId
        })

        const postReplied = await Post.findByIdAndUpdate(
            postId,
            { $push: { replyRefs: newReply._id } },
            { new: true }
        )

        res
            .status(200)
            .json({ newReply, postReplied })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const deleteReply = async (req, res) => {
    try {
        const { replyId } = req.params;

        const deletedReply = await Reply.findByIdAndDelete(replyId)
        console.log(deletedReply._id);
        const updatedPost = await Post.findByIdAndUpdate(
            deletedReply.postRef,
            { $pull: {
                replyRefs: deletedReply._id
            } },
            { new: true }
        )

        res
            .status(200)
            .json({ updatedPost })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const getReplies = async (req, res) => {
    try {
        
        const replies = await Reply.find({ postRef: postId })

        const transformedReplies = await Promise.all(replies.map(async reply => {
            const user = await clerkClient.users.getUser(reply.userRef)
            const { imageUrl, firstName, lastName } = user

            return {
                ...reply.toObject(),
                imageUrl,
                fullname: `${firstName} ${lastName}`
            }
        }))

        res
            .status(200)
            .json({ transformedReplies })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}