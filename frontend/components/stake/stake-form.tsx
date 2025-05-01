"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { InfoIcon as InfoCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StakeForm() {
  const [amount, setAmount] = useState<string>("0");
  const [token, setToken] = useState<string>("ETH");
  const [duration, setDuration] = useState<number>(30);
  const [step, setStep] = useState<number>(1);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setDuration(value[0]);
  };

  const handleMaxClick = () => {
    // In a real app, this would get the max available balance
    setAmount("10.0");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirm = () => {
    // In a real app, this would submit the transaction
    alert("Staking transaction submitted!");
    setStep(1);
    setAmount("0");
  };

  const estimatedRewards = Number.parseFloat(amount || "0") * 0.05 * (duration / 30);

  return (
    <div>
      {step === 1 ? (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="amount">Amount to Stake</Label>
                <span className="text-sm text-slate-500">Available: 10.0 {token}</span>
              </div>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input id="amount" type="text" value={amount} onChange={handleAmountChange} className="pr-16" placeholder="0.0" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-sm font-medium text-blue-600"
                    onClick={handleMaxClick}
                  >
                    MAX
                  </Button>
                </div>
                <Select value={token} onValueChange={setToken}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Staking Duration</Label>
                <span className="text-sm font-medium">{duration} days</span>
              </div>
              <Slider defaultValue={[30]} max={365} min={7} step={1} value={[duration]} onValueChange={handleSliderChange} />
              <div className="flex justify-between text-xs text-slate-500">
                <span>7 days</span>
                <span>1 year</span>
              </div>
            </div>

            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <InfoCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Estimated Rewards</span>
                  </div>
                  <span className="font-medium">
                    {estimatedRewards.toFixed(4)} {token}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>APY</span>
                  <span>5.0%</span>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={!amount || Number.parseFloat(amount) <= 0}>
              Review Staking
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium">Confirm Staking</h3>
            <p className="text-sm text-slate-600">Please review your staking details</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Amount</span>
              <span className="font-medium">
                {amount} {token}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Duration</span>
              <span className="font-medium">{duration} days</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Estimated Rewards</span>
              <span className="font-medium">
                {estimatedRewards.toFixed(4)} {token}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Unlock Date</span>
              <span className="font-medium">{new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Button onClick={handleConfirm}>Confirm Staking</Button>
            <Button variant="outline" onClick={() => setStep(1)}>
              Back to Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
