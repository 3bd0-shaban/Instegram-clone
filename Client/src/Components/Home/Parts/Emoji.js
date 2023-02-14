import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const Emoji = ({ setComment, comment }) => {
    return (
        <>
            <Picker
                data={data}
                previewPosition='none'
                theme='light'
                showSkinTones="true"
                showPreview="false"
                onEmojiSelect={(e) => setComment(comment + e.native)}
            />
        </>
    );
};

export default Emoji;
