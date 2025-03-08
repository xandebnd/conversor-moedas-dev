"use client";

import React, { type FormEvent, useState } from "react";

import Logo from "@/assets/logo.svg";
import Image from "next/image";

export default function Home() {
	const [value, setValue] = useState("");
	const [currency, setCurrency] = useState("");
	const [newCurrency, setNewCurrency] = useState("");
	const [convertedValue, setConvertedValue] = useState(0);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const response = await fetch(
			`https://economia.awesomeapi.com.br/json/last/${currency}-${newCurrency}`,
		);

		const data = await response.json();

		const isValueValid = value
			.replace(",", ".")
			.match(/^[0-9]+(\.[0-9]{1,2})?$/);

		if (!isValueValid) {
			alert("Valor inválido");
			return;
		}

		const convertedValue =
			data[`${currency}${newCurrency}`].bid * +value.replace(",", ".");

		setConvertedValue(convertedValue);
	};

	return (
		<main className="bg-yellow-200 h-screen flex items-center justify-center">
			<section className="flex flex-col items-center justify-center">
				<div className="px-10 rounded-md bg-gray-200 shadow-md">
					<div className="flex flex-col items-center justify-center">
						<Image src={Logo} alt="Logo do banco" priority width={100} />
						<h1 className="font-bold text-3xl mb-5">ConvertDev Coins</h1>
					</div>

					<form className="flex flex-col gap-3" onSubmit={onSubmit}>
						<div className="flex flex-col">
							<label htmlFor="value" className="font-semibold text-xl">
								Valor
							</label>
							<input
								type="text"
								className="border rounded-md px-5 py-2 outline-none"
								onChange={({ target }) => setValue(target.value)}
							/>
						</div>

						<div className="flex flex-col">
							<label htmlFor="currency" className="font-semibold text-xl">
								De
							</label>
							<select
								name="currency"
								className="outline-none border px-5 py-2 rounded-md"
								onChange={(e) => setCurrency(e.target.value)}
							>
								<option disabled selected value="">
									Selecione uma moeda
								</option>
								<option value="USD">Dólar Americano (USD)</option>
								<option value="EUR">Euro (EUR)</option>
								<option value="BRL">Real Brasileiro (BRL)</option>
								<option value="JPY">Iene Japonês (JPY)</option>
								<option value="GBP">Libra Esterlina (GBP)</option>
								<option value="AUD">Dólar Australiano (AUD)</option>
								<option value="CAD">Dólar Canadense (CAD)</option>
								<option value="CHF">Franco Suíço (CHF)</option>
								<option value="CNY">Yuan Chinês (CNY)</option>
								<option value="INR">Rupia Indiana (INR)</option>
							</select>
						</div>

						<div className="flex flex-col">
							<label htmlFor="currency" className="font-semibold text-xl">
								Para
							</label>
							<select
								name="currency"
								id="currency"
								className="outline-none border px-5 py-2 rounded-md"
								onChange={(e) => setNewCurrency(e.target.value)}
							>
								<option disabled selected value="">
									Selecione uma moeda
								</option>
								<option value="USD">Dólar Americano (USD)</option>
								<option value="EUR">Euro (EUR)</option>
								<option value="BRL">Real Brasileiro (BRL)</option>
								<option value="JPY">Iene Japonês (JPY)</option>
								<option value="GBP">Libra Esterlina (GBP)</option>
								<option value="AUD">Dólar Australiano (AUD)</option>
								<option value="CAD">Dólar Canadense (CAD)</option>
								<option value="CHF">Franco Suíço (CHF)</option>
								<option value="CNY">Yuan Chinês (CNY)</option>
								<option value="INR">Rupia Indiana (INR)</option>
							</select>
						</div>

						<input
							type="submit"
							value="Converter"
							className="mt-5 px-5 py-2 rounded-md bg-orange-300 mb-10 font-semibold cursor-pointer hover:bg-orange-400 duration-200 shadow-md"
						/>
					</form>
					{convertedValue > 0 && (
						<div className="text-center">
							<h2 className="font-semibold text-xl">
								Valor convertido:{" "}
								<span className="text-yellow-600 font-bold">
									{new Intl.NumberFormat("pt-BR", {
										style: "currency",
										currency: newCurrency,
									}).format(convertedValue)}
								</span>
							</h2>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
