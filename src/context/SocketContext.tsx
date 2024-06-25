"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { initializeSocket } from "../lib/socket";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const SocketProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const init = async () => {
      const socket = await initializeSocket();

      setSocket(socket);

      return () => {
        socket.disconnect();
      };
    };

    init();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
