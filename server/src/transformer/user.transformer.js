export default function UserTransformer(arg) {
    if (arg) {
        const { password, isDeleted, ...transformedData } = arg;
        return transformedData;
    }
    return;
}