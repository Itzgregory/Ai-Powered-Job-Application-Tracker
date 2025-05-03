export const HeaderProfileUpdate = ({ lastUpdated }: { lastUpdated: number | null }) => (
    <>
      <div className="flex justify-end mb-6 md:mb-8">
        <p className="text-sm text-gray-500">
          Profile last updated on: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Never'}
        </p>
      </div>
    </>
  );