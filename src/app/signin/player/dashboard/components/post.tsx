import Image from "next/image";

type PostProps = {
  author: string;
  time: string;
  content: string;
  image: string;
  comments: number;
  shares: number;
};

export default function Post({ author, time, content, image, comments, shares }: PostProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="flex items-center mb-2">
        <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-3">{content}</p>
      <div className="relative w-full h-60 mb-3">
        <Image src={image} alt="post image" fill className="object-cover rounded-md" />
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <button className="hover:text-blue-600">Like</button>
        <button className="hover:text-blue-600">Comments ({comments})</button>
        <button className="hover:text-blue-600">Shares ({shares})</button>
      </div>
    </div>
  );
}