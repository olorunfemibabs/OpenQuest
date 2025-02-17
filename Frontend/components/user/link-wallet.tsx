"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { WalletConnect } from "@/components/wallet/wallet-connect";
import { useAuth } from "@/contexts/auth-context";
import { userService } from "@/services/user-service";

export function LinkWallet() {
  const { address, isConnected } = useAccount();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLinking, setIsLinking] = useState(false);

  const handleLinkWallet = async () => {
    try {
      if (!address || !user?.id) {
        toast({
          title: "Error",
          description: "Please connect your wallet first",
          variant: "destructive",
        });
        return;
      }

      setIsLinking(true);
      await userService.linkWallet({
        user_uuid: user.id,
        wallet_address: address,
      });

      toast({
        title: "Success",
        description: "Wallet linked successfully",
      });
    } catch (error) {
      console.error("Failed to link wallet:", error);
      toast({
        title: "Error",
        description: "Failed to link wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLinking(false);
    }
  };

  if (user?.walletAddress) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Wallet connected: {user.walletAddress}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {!isConnected ? (
        <>
          <p className="text-sm text-muted-foreground">
            Connect your wallet to start participating in quizzes
          </p>
          <WalletConnect />
        </>
      ) : (
        <Button onClick={handleLinkWallet} disabled={isLinking}>
          {isLinking ? "Linking..." : "Link Wallet"}
        </Button>
      )}
    </div>
  );
}
