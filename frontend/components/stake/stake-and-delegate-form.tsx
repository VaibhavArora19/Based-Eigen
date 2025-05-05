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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function StakeAndDelegateForm() {
  const [amount, setAmount] = useState<string>("0");
  const [token, setToken] = useState<string>("ETH");
  const [duration, setDuration] = useState<number>(30);
  const [operator, setOperator] = useState<string>("operator1");
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
    alert("Staking and delegation transaction submitted!");
    setStep(1);
    setAmount("0");
  };

  const estimatedRewards = Number.parseFloat(amount || "0") * 0.07 * (duration / 30);

  const operators = [
    {
      id: "0x3E58925C2d13c67658fe539e5b15bD78F1e57a09",
      name: "DeFiShield Validator",
      apy: "7.2%",
      totalStaked: "1.2M ETH",
      uptime: "99.98%",
    },
  ];

  const selectedOperator = operators.find((op) => op.id === operator);

  return (
    <div>
      {step === 1 ? (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="delegate-amount">Amount to Stake & Delegate</Label>
                <span className="text-sm text-slate-500">Available: 10.0 {token}</span>
              </div>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input id="delegate-amount" type="text" value={amount} onChange={handleAmountChange} className="pr-16" placeholder="0.0" />
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
                <Button variant={"outline"}>WETH</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Select Operator</Label>
              <RadioGroup value={operator} onValueChange={setOperator} className="space-y-3">
                {operators.map((op) => (
                  <div
                    key={op.id}
                    className={`flex items-center space-x-3 rounded-lg border p-4 ${
                      operator === op.id ? "border-blue-500 bg-blue-50" : "border-slate-200"
                    }`}
                  >
                    <RadioGroupItem value={op.id} id={op.id} />
                    <Label htmlFor={op.id} className="flex flex-1 items-center justify-between cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{op.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{op.name}</div>
                          <div className="text-xs text-slate-500">Total Staked: {op.totalStaked}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          APY {op.apy}
                        </Badge>
                        <div className="text-xs text-slate-500 mt-1">Uptime: {op.uptime}</div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
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
                  <span>APY (with delegation)</span>
                  <span>7.0%</span>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={!amount || Number.parseFloat(amount) <= 0}>
              Review Staking & Delegation
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium">Confirm Staking & Delegation</h3>
            <p className="text-sm text-slate-600">Please review your details</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Amount</span>
              <span className="font-medium">
                {amount} {token}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Operator</span>
              <span className="font-medium">{selectedOperator?.name}</span>
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
            <Button onClick={handleConfirm}>Confirm Staking & Delegation</Button>
            <Button variant="outline" onClick={() => setStep(1)}>
              Back to Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
