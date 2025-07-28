export const STATUS_MESSAGE = {
    CONNECTIONFAILURE: "Connection Failure",
    INTERNAL_SERVER_ERROR: "Internal server error",
    SUCCESS: "Data fetched successfully",
    CREATED: "Created successfully",
    UPDATED: "Updated successfully",
    DELETED: "Deleted successfully"
  } as const;
  
  export type StatusMessage = (typeof STATUS_MESSAGE)[keyof typeof STATUS_MESSAGE];
  