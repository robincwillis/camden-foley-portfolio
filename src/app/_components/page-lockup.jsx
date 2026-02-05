import RichText from "@/app/_components/rich-text";

export default function PageLockup({ lockup }) {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
      <div className="lg:col-span-2 pb-5 lg:pb-0">
        <h1 className="text-4xl font-medium">{lockup?.headline}</h1>
      </div>
      <div className="mb-1 lg:mb-0 lg:col-span-3">
        <h2 className="text-lg lg:text-base xl:text-lg font-medium">
          {lockup?.subHeadline}
        </h2>
      </div>
      <div className="lg:col-span-7 flex lg:justify-end">
        <RichText
          document={lockup.body.json}
          classNames={{
            paragraph: "text-lg lg:text-base xl:text-lg font-light",
          }}
        />
      </div>
    </div>
  );
}
