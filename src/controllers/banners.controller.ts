import { Request, Response } from "express";
import { BannerService } from "../services/banners.service";

export const BannerController = {
  async getAll(req: Request, res: Response) {
    try {
      const banners = await BannerService.getAll();
      res.status(200).json(banners);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch banners", error: err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const banner = await BannerService.getById(req.params.id);
      if (!banner) return res.status(404).json({ message: "Banner not found" });
      res.status(200).json(banner);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch banner", error: err });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const banner = await BannerService.create(req.body);
      res.status(201).json(banner);
    } catch (err) {
      res.status(500).json({ message: "Failed to create banner", error: err });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const banner = await BannerService.update(req.params.id, req.body);
      if (!banner) return res.status(404).json({ message: "Banner not found" });
      res.status(200).json(banner);
    } catch (err) {
      res.status(500).json({ message: "Failed to update banner", error: err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const banner = await BannerService.delete(req.params.id);
      if (!banner) return res.status(404).json({ message: "Banner not found" });
      res.status(200).json({ message: "Banner deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete banner", error: err });
    }
  },
};