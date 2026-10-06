import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  orm: {
    contract: "./prisma/contract.prisma",
  },
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});
